import { Card, Stack, Container } from "@mui/material";
import CardProduct from "../components/Cart&Favourite/CardProduct";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { useEffect } from "react";
import CardProductFav from "../components/Cart&Favourite/CardProductFav";
import { useState } from "react";
import axios from "axios";
import { Product } from "../components/Catalog/IProduct";
import { changeToken } from "../slices/UserSlice";
import upTok from "../updateTokenFunc";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  rectSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
const Favour = () => {
  const senc = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
  );
  const tok = useSelector((state: RootState) => state.user.accessToken);
  const [products, setProd] = useState<Product[]>([]);
  const dispatch = useDispatch();

  useEffect(() => {
    async function getFav(token: string) {
      try {
        const pr = await axios.post(
          `http://localhost:5000/api/user/favourite`,
          {},
          {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true,
          },
        );
        setProd(pr.data.usersFavour);
      } catch (err: any) {
        if (err.response && err.response.data) {
          console.log("Ошибка от бэкенда:", err.response.data.message);
          if (err.status == 422) {
            const newtok = await upTok();
            if (!newtok.token) return;
            dispatch(changeToken(newtok.token));
            getFav(newtok.token);
          }
        } else {
          console.log("Ошибка сети:", err.message);
        }
      }
    }
    getFav(tok);
  }, []);
  async function deleteFav(id: number) {
    try {
      await axios.delete(`http://localhost:5000/api/favourite/${id}`, {
        headers: { Authorization: `Bearer ${tok}` },
        withCredentials: true,
      });
      const res = await axios.post(
        `http://localhost:5000/api/user/favourite`,
        {},
        {
          headers: { Authorization: `Bearer ${tok}` },
          withCredentials: true,
        },
      );
      setProd(res.data.usersFavour);
    } catch (err: any) {
      if (err.response && err.response.data) {
        console.log("Ошибка от бэкенда:", err.response.data.message);
        if (err.status == 422) {
          upTok();
        }
      } else {
        console.log("Ошибка сети:", err.message);
      }
    }
  }
  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (over !== null && active.id !== over.id) {
      const oldIndex = products.findIndex(
        (product) => product.id === active.id,
      );
      const newIndex = products.findIndex((product) => product.id === over.id);
      setProd(arrayMove(products, oldIndex, newIndex));
    }
  }
  return (
    <Container content="section">
      <Stack direction="row" sx={{ gap: 10 }}>
        <DndContext
          sensors={senc}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={products.map((product) => product.id)}
            strategy={rectSortingStrategy}
          >
            {products?.map((product) => (
              <CardProductFav
                key={product.id}
                product={product}
                deleteFav={deleteFav}
              />
            ))}
          </SortableContext>
        </DndContext>
      </Stack>
    </Container>
  );
};
export default Favour;
