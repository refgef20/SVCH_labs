import Menu from "../components/Catalog/MenuCatalog.jsx";
import { Catal } from "../App.js";
import { Delete } from "@mui/icons-material";

const Catalog = ({ add, addFav }: Catal) => {
  return <Menu add={add} addFav={addFav} />;
};
export default Catalog;
