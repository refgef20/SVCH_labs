import { useState, useEffect } from "react";

export interface Product {
  id: number;
  name_ru: string;
  name_en: string;
  price: number;
  description_ru: string;
  description_en: string;
  category: string;
  rating: number;
  photo: string;
}
