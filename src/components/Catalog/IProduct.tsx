import { useState, useEffect } from "react";

export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  category: string;
  rating: number;
  photo: string;
}
