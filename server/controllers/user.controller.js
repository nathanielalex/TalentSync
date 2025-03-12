import User from '../models/user.model.js';

export const updateProfile = async (req, res) => {
  const { userId } = req.params;  // Assuming user ID is passed in the route params
  const { username, email, profilePicture, role, seekerDetails, recruiterDetails } = req.body;

  try {
    // Find the user by ID (or use email if that's more appropriate)
    const user = await User.findById(userId); // Or User.findOne({ email }) if you're searching by email

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Only update the fields provided in the request body
    if (username) user.username = username;
    if (email) user.email = email;
    if (profilePicture) user.profilePicture = profilePicture;
    if (role) user.role = role;

    // Update role-specific details
    if (user.role === 'seeker' && seekerDetails) {
      user.seekerDetails = { ...user.seekerDetails, ...seekerDetails };  // Merge old and new seekerDetails
    }

    if (user.role === 'recruiter' && recruiterDetails) {
      user.recruiterDetails = { ...user.recruiterDetails, ...recruiterDetails }; // Merge old and new recruiterDetails
    }

    // Save the updated user document
    await user.save();

    res.status(200).json({ message: 'Profile updated successfully', user });
  } catch (error) {
    res.status(500).json({ message: 'Error updating profile', error: error.message });
  }
};