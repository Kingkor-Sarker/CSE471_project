import * as productModel from '../models/productModel.js';
import { asyncHandler } from '../middleware/errorHandler.js';

// @desc    Get all products
// @route   GET /api/products
// @access  Public
export const getAllProducts = asyncHandler(async (req, res) => {
  const products = await productModel.getAllProducts();
  res.status(200).json({
    success: true,
    count: products.length,
    data: products,
  });
});

// @desc    Get single product by ID
// @route   GET /api/products/:id
// @access  Public
export const getProductById = asyncHandler(async (req, res) => {
  const product = await productModel.getProductById(req.params.id);
  
  if (!product) {
    return res.status(404).json({
      success: false,
      error: 'Product not found',
    });
  }

  res.status(200).json({
    success: true,
    data: product,
  });
});

// @desc    Create new product
// @route   POST /api/products
// @access  Private (add auth middleware later)
export const createProduct = asyncHandler(async (req, res) => {
  const product = await productModel.createProduct(req.body);
  res.status(201).json({
    success: true,
    data: product,
  });
});

// @desc    Update product
// @route   PUT /api/products/:id
// @access  Private (add auth middleware later)
export const updateProduct = asyncHandler(async (req, res) => {
  const product = await productModel.updateProduct(req.params.id, req.body);
  
  if (!product) {
    return res.status(404).json({
      success: false,
      error: 'Product not found',
    });
  }

  res.status(200).json({
    success: true,
    data: product,
  });
});

// @desc    Delete product
// @route   DELETE /api/products/:id
// @access  Private (add auth middleware later)
export const deleteProduct = asyncHandler(async (req, res) => {
  const deleted = await productModel.deleteProduct(req.params.id);
  
  if (!deleted) {
    return res.status(404).json({
      success: false,
      error: 'Product not found',
    });
  }

  res.status(200).json({
    success: true,
    data: {},
  });
});

