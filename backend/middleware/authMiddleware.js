
import jwt from 'jsonwebtoken'
import user from '../models/user.js'

// Protect routes using JWT authentication
const authMiddleware = async (req, res, next) => {
  try {
    // Get token from Authorization header
    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required. Please login.',
      })
    }

    const token = authHeader.split(' ')[1]

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Invalid authentication token.',
      })
    }

    // Verify JWT token
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    )

    // Find authenticated user
    const authenticatedUser = await user.findById(decoded.id)

    if (!authenticatedUser) {
      return res.status(401).json({
        success: false,
        message: 'User not found. Please login again.',
      })
    }

    // Attach user information to request
    req.user = authenticatedUser

    next()

  } catch (error) {
    console.error('Authentication middleware error:', error.message)

    return res.status(401).json({
      success: false,
      message: 'Invalid or expired token. Please login again.',
    })
  }
}

export default authMiddleware
