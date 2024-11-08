import { Router } from 'express';
import { body } from 'express-validator';
import { createProduct, deleteProduct, getProduct, getProducts, updateProduct } from './handlers/products';
import { createUpdate, deleteUpdate, getUpdate, getUpdates, updateUpdate } from './handlers/updates';
import { handleInputError } from './modules/middleware';

const router = Router();

/**
 * Product
 */
router.get('/product', getProducts);
router.get('/product/:id', getProduct);
router.put('/product/:id', body('name').isString(), handleInputError, updateProduct);
router.post('/product', body('name').isString(), handleInputError, createProduct);
router.delete('/product/:id', deleteProduct)

/**
 * Update
 */
router.get('/update', getUpdates);
router.get('/update/:id', getUpdate);
router.put('/update/:id',
    body('title').optional(),
    body('body').optional(),
    body('status').isIn(['IN_PROGRESS', 'SHIPPED', 'DEPRECATED']).optional(),
    body('version').optional(),
    updateUpdate
);
router.post('/update',
    body('title').exists(),
    body('body').isString(),
    createUpdate
);
router.delete('/update/:id', deleteUpdate);

/**
 * Update Point
 */
router.get('/updatepoint', () => { });
router.get('/updatepoint/:id', () => { });
router.put('/updatepoint/:id',
    body('name').optional().isString(),
    body('description').optional().isString(),
    () => { }
);
router.post('/updatepoint',
    body('name').isString(),
    body('description').isString(),
    body('updateId').exists().isString(),
    () => { }
);
router.delete('/updatepoint/:id', () => { });

export default router;