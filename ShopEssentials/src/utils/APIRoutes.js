
const host = import.meta.env.VITE_BACKEND_URL

export const SignupRoutes = `${host}/api/auth/signup`
export const LoginRoutes = `${host}/api/auth/login`
export const FeedBackRoutes = `${host}/api/auth/feedback`
export const CreateOrderRoutes = `${host}/api/auth/createproduct`
export const FetchProductsRoutes = `${host}/api/auth/products`
export const DeleteProductRoutes = `${host}/api/auth/delete`
export const OrderProductRoute = `${host}/api/auth/order`
