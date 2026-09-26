import prisma from '../config/prisma.js';

export const subscribeNewsletter = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email || !email.includes('@')) {
      return res.status(400).json({ message: 'Please provide a valid email address' });
    }

    const normalizedEmail = email.toLowerCase().trim();
    const existing = await prisma.newsletterSubscriber.findUnique({
      where: { email: normalizedEmail },
    });

    const userId = req.user?.id || req.body.userId || null;

    if (existing) {
      // If subscriber exists as guest and is now logged in, optionally link their userId
      if (userId && !existing.userId) {
        await prisma.newsletterSubscriber.update({
          where: { id: existing.id },
          data: { userId },
        });
      }
      return res.status(200).json({ message: 'You are already subscribed to Ansari Furniture journal.' });
    }

    await prisma.newsletterSubscriber.create({
      data: {
        email: normalizedEmail,
        userId: userId || null,
      },
    });

    res.status(201).json({ message: 'Welcome to Ansari Furniture. You have successfully subscribed.' });
  } catch (error) {
    console.error('subscribeNewsletter error:', error);
    res.status(500).json({ message: error.message });
  }
};
