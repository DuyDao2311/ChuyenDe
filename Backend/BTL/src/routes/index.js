const { Router } = require('express');

const authRoutes = require('./auth.routes')
const bookRoutes = require('./book.routes');
const readerRoutes = require('./reader.routes');
const statsRoutes = require('./stats.routes');
const serviceRoutes = require('./borrow_transaction.routes')
const router = Router();

router.use('/auth', authRoutes)
router.use('/books', bookRoutes);
router.use('/readers', readerRoutes);
router.use('/stats', statsRoutes);
router.use('/service', serviceRoutes)
module.exports = router;

