export type Product = {
  id: number;
  title: string;
  price: number;
  image: string;
  description: string;
};

export type CartItem = Product & {
  quantity: number;
};

export type RegisteredUser = {
  id: number;
  name: string;
  email: string;
  password: string;
  registeredAt: string;
};

export type RegisterFormData = {
  name: string;
  email: string;
  password: string;
};

export type CategoryCard = {
  modifier: string;
  label: string;
  title: string;
};

export type MenuSection = {
  title: string;
  items: string[];
};

export type FeatureItem = {
  icon: string;
  title: string;
  text: string;
};

export type SocialLink = {
  icon: string;
  label: string;
};
