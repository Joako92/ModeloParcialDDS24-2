import React from "react";
import { useForm } from "react-hook-form";
import { deudoresService } from "../../services/deudores.service";
import modalDialogService from "../../services/modalDialog.service";

export default function AgregarDeudor ({setAccion, reqApi}) {
  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields, isValid, isSubmitted },
  } = useForm();

  const onSubmit = (data) => {
    deudoresService.Grabar(data);
    modalDialogService.Alert(
      "Registro agregado correctamente."
    );
    setAccion('L')
    reqApi()
  };

    return(
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="container-fluid">

          <fieldset>


              {/* campo Apellido y Nombre */}
              <div className="row">
                <div className="col-sm-4 col-md-3 offset-md-1">
                  <label className="col-form-label" htmlFor="ApellidoYNombre">
                  Apellido y Nombre<span className="text-danger">*</span>:
                  </label>
                </div>
                <div className="col-sm-8 col-md-6">
                  <input
                    type="text"
                    {...register("ApellidoYNombre", {
                      required: { value: true, message: "Apellido y Nombre es requerido" },
                      minLength: {
                        value: 4,
                        message: "Apellido y Nombre debe tener al menos 4 caracteres",
                      },
                      maxLength: {
                        value: 55,
                        message: "Apellido y Nombre debe tener como máximo 55 caracteres",
                      },
                    })}
                    autoFocus
                    className={
                      "form-control " + (errors?.ApellidoYNombre ? "is-invalid" : "")
                    }
                  />
                  {errors?.ApellidoYNombre && touchedFields.ApellidoYNombre && (
                    <div className="invalid-feedback">
                      {errors?.ApellidoYNombre?.message}
                    </div>
                  )}
                </div>
              </div>

              {/* campo ImporteAdeudado */}
              <div className="row">
                <div className="col-sm-4 col-md-3 offset-md-1">
                  <label className="col-form-label" htmlFor="ImporteAdeudado">
                  Importe Adeudado<span className="text-danger">*</span>:
                  </label>
                </div>
                <div className="col-sm-8 col-md-6">
                  <input
                    type="number" step=".01"
                    {...register("ImporteAdeudado", {
                      required: { value: true, message: "Importe Adeudado es requerido" },
                      min: {
                        value: 0.01,
                        message: "Importe Adeudado debe ser mayor a 0",
                      },
                      max: {
                        value: 99999.99,
                        message: "Importe Adeudado debe ser menor o igual a 99999.99",
                      },
                    })}
                    className={
                      "form-control " + (errors?.ImporteAdeudado ? "is-invalid" : "")
                    }
                  />
                  <div className="invalid-feedback">{errors?.ImporteAdeudado?.message}</div>
                </div>
              </div>

              {/* campo FechaDeuda */}
              <div className="row">
                <div className="col-sm-4 col-md-3 offset-md-1">
                  <label className="col-form-label" htmlFor="FechaDeuda">
                    Fecha Deuda<span className="text-danger">*</span>:
                  </label>
                </div>
                <div className="col-sm-8 col-md-6">
                  <input
                    type="date"
                    {...register("FechaDeuda", {
                      required: { value: true, message: "Fecha Deuda es requerido" }
                    })}
                    className={
                      "form-control " + (errors?.FechaDeuda ? "is-invalid" : "")
                    }
                  />
                  <div className="invalid-feedback">
                    {errors?.FechaDeuda?.message}
                  </div>
                </div>
              </div>

            </fieldset>

            {/* Botones Grabar, Cancelar/Volver' */}
            <hr />
            <div className="row justify-content-center">
              <div className="col text-center botones">   
                  <button type="submit" className="btn btn-primary">
                    <i className="fa fa-check"></i> Grabar
                  </button>                
              </div>
            </div>

            {/* texto: Revisar los datos ingresados... */}
            {!isValid && isSubmitted && (
              <div className="row alert alert-danger mensajesAlert">
                <i className="fa fa-exclamation-sign"></i>
                Revisar los datos ingresados...
              </div>
            )}

          </div>
        </form>
    )
}