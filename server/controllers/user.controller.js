import User from '../models/user.model.js';

export const updateProfile = async (req, res) => {
  const { userId } = req.params;
  const { username, email, profilePicture, role, seekerDetails, recruiterDetails } = req.body;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (username) user.username = username;
    if (email) user.email = email;
    if (profilePicture) user.profilePicture = profilePicture;
    if (role) user.role = role;

    if (user.role === 'seeker' && seekerDetails) {
      user.seekerDetails = { ...user.seekerDetails, ...seekerDetails };  // Merge old and new seekerDetails
    }

    if (user.role === 'recruiter' && recruiterDetails) {
      user.recruiterDetails = { ...user.recruiterDetails, ...recruiterDetails }; // Merge old and new recruiterDetails
    }

    await user.save();

    res.status(200).json({ message: 'Profile updated successfully', user });
  } catch (error) {
    res.status(500).json({ message: 'Error updating profile', error: error.message });
  }
};

export const getUserDetails = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
