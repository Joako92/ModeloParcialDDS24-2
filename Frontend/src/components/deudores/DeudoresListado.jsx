import { deudoresService } from '../../services/deudores.service.js'
import { useState, useEffect } from "react";
import moment from "moment";
import DeudoresRegistro from './DeudoresRegistro.jsx'
import modalDialogService from "../../services/modalDialog.service";

export default function DeudoresListado() {
    const [deudores, setDeudores] = useState([])
    const [error, setError] = useState(null);
    const [Accion, setAccion] = useState("L");

    const reqApi = async () => {
        try {
            const api = await deudoresService.Buscar()
            setDeudores(api.Items)
        } catch (error) {
            setError(error.message)
            console.error("Error en el fetch de deudores:", error)
        }
    }

    useEffect(() => {reqApi()}, [])

    if (error) {
        return <div>Error: {error}</div>;
      }

    const Agregar = () => {
        setAccion('R')
    }

    const borrarDeudor = (filaDeudor) => {
        deudoresService.Borrar(filaDeudor)
        modalDialogService.Alert(
            "Registro borrado correctamente."
          );
        reqApi()
    }

    return(
        
        <div className="table-responsive">
            <div className="tituloPagina">
                Deudores
            </div>
        {Accion === "L" && (
            <>
                <table className="table table-hover table-sm table-bordered table-striped">
                    <thead>
                    <tr>
                        <th className="text-center">Apellido y Nombre</th>
                        <th className="text-center">Importe</th>
                        <th className="text-center">Fecha Deuda</th>
                        <th className="text-center">Borrar</th>
                    </tr>
                    </thead>
                    <tbody>
                    {deudores &&
                        deudores.map((deudor) => (
                        <tr key={deudor.IdDeudor}>
                            <td>{deudor.ApellidoYNombre}</td>
                            <td className="text-end">{`$${deudor.ImporteAdeudado}`}</td>
                            <td className="text-end">
                            {moment(deudor.FechaDeuda).format("DD/MM/YYYY")}
                            </td>
                            <td>
                                <button className='btn btn-sm btn-outline-danger' title='Borrar' onClick={() => borrarDeudor(deudor)}>
                                <i
                                className="fa fa-times"
                                ></i>
                                </button>
                            </td>
                        </tr>
                        ))}
                    </tbody>
                </table>
                
                <div className="paginador">
                    <div className="row">
                    <div className="col">
                        <button className="btn btn-primary float-end" onClick={() => Agregar()}>
                        <i className="fa fa-plus"></i>Agregar Deudor
                        </button>
                    </div>
                    </div>
                </div>
            </>
        )}

        {Accion === "R" && (
            <>
            <h2>Registro</h2>
            <button className="btn btn-warning" onClick={() => setAccion('L')}>
                <i className="fa fa-undo"></i>Volver
            </button>
            <DeudoresRegistro {...{ setAccion, reqApi }}></DeudoresRegistro>
            </>
        )}
      

      
    </div>
    )
}