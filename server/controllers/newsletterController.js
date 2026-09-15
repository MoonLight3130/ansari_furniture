import NewsletterSubscriber from '../models/NewsletterSubscriber.js';

export const subscribeNewsletter = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email || !email.includes('@')) {
      return res.status(400).json({ message: 'Please provide a valid email address' });
    }

    const existing = await NewsletterSubscriber.findOne({ email });
    if (existing) {
      return res.status(200).json({ message: 'You are already subscribed to Ansari Furniture journal.' });
    }

    await NewsletterSubscriber.create({ email });
    res.status(201).json({ message: 'Welcome to Ansari Furniture. You have successfully subscribed.' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
