import axios from "axios";

//const urlResource = "https://labsys.frc.utn.edu.ar/dds-express/api/deudores";
import {config} from "../config";
const urlResource = config.urlResourceDeudores;

async function Buscar() {
  const resp = await axios.get(urlResource);
  return resp.data;
}

async function Grabar(item) {
  const resp = await axios.post(urlResource, item);
  return resp.data
}

async function Borrar(item) {
  const resp = await axios.delete(urlResource + "/" + item.IdDeudor)
  return resp.data
}

export const deudoresService = {
  Buscar, Grabar, Borrar
};
