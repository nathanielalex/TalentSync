import User from '../models/user.model.js';

export const updateSeekerDetails = async (req, res) => {
  const { userId } = req.params;
  const { fullName, profileImage, headline, location, hourlyRate, overview, skills, experience, education } = req.body;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    if (user.role !== 'seeker') {
      return res.status(400).json({ message: 'This user is not a seeker.' });
    }

    user.seekerDetails = {
      fullName,
      profileImage,
      headline,
      location,
      hourlyRate,
      overview,
      skills,
      experience,
      education
    };
    await user.save();

    res.status(200).json({
      message: 'Seeker details updated successfully.',
      seekerDetails: user.seekerDetails
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error while updating seeker details.' });
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
