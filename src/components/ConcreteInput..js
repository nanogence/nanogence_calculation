import React, { useState, useEffect } from 'react';
import Output from './Output';
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import CementParameters from "../cement-parameters.json";

import CementImg from "../images/cement_logo.jpg"
import ConcreteImg from "../images/concrete_logo.jpg"

const ConcreteInput = (props) => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [parameters, setParameters] = useState(CementParameters)
  const [calRes, setCalRes] = useState({})

  const onSubmit = (input) => {

        const b_7 = input.b_5_current_cement / 1000
      const c_7 = b_7 * input.c_6_cement_cost
        const b_10 = 1 - b_7
      const c_10 = input.c_9_aggregate_costs * b_10
        const b_14 = input.b_12_admixture_liter / 1000
      const c_14 = input.c_13_admixture_costs * b_14
    const c_16 = c_7 + c_10 + c_14
              const c_21 = 1 - (input.b_20_expected_cement / input.b_5_current_cement)
            const c_22 = c_7 * c_21
            const c_24 = c_21 / 2
            const c_25 = input.c_9_aggregate_costs * c_24
            const c_28 = parameters.con_c_27_admixture_reduction * c_14
          const c_30 = c_16 - c_22 + c_25 - c_28
        const c_33 = c_16 - c_30
        const c_37 = c_33 * parameters.con_b_37_acceptable_price
      const c_42 = c_33 - c_37
    const c_43 = c_16 - c_42      
    const c_57 = parameters.con_c_56_costs_co2 * parameters.con_b_69_m3_concrete / 1000
      const c_59 = parameters.con_b_53_kg_co2_emitted * 0.8
    const c_60 = c_59 * c_57 / parameters.con_b_53_kg_co2_emitted
    const c_63 = c_16 + c_57
    const c_64 = c_43 + c_60
    
    const material_costs = c_16
    const material_costs_cat = c_43
    const co2_costs = c_57
    const co2_costs_cat = c_60
    const total_costs = c_63
    const total_costs_cat = c_64
    setCalRes([
      ['Materials costs', material_costs, material_costs_cat],
      ['CO2 costs', co2_costs, co2_costs_cat],
      ['Total costs', total_costs, total_costs_cat]
    ])
    setIsSubmitted(true)
  }
  return (
    <div className="my-2 px-2">

      <Link to="/">
        <div className="flex h-16 items-center cursor-pointer">
          <img src={ConcreteImg} className="h-full w-auto" alt="cement" />
          <span className="mx-4 text-2xl font-bold">Concrete</span>
        </div>
      </Link>

      <form onSubmit={handleSubmit(onSubmit)}>

      <div className="flex justify-between items-center my-2">
        <label className="text-base md:text-lg">Please fill in the information</label>
        <input type="submit" className="cement_input_submit" value="Submit" />
      </div>

      <div className="grid grid-cols-3 my-4">
        <label className="col-span-3 md:col-span-2 text-lg text-left">
          1. Current cement of concrete :
        </label>
        <div className="cement_input">
          <input type="number" className="cement_input_value" step="0.01" {...register("b_5_current_cement", { required: true })} />
          <label className="cement_input_label">kg/m<sup>3</sup></label>
        </div>        
      </div>

      <div className="grid grid-cols-3 my-4">
        <label className="col-span-3 md:col-span-2 text-lg text-left">
          2. Expected cement of concrete :
        </label>
        <div className="cement_input">
          <input type="number" className="cement_input_value" step="0.01" {...register("b_20_expected_cement", { required: true })} />
          <label className="cement_input_label">kg/m<sup>3</sup></label>
        </div>
      </div>

      <div className="grid grid-cols-3 my-4">
        <label className="col-span-3 md:col-span-2 text-lg text-left">
          3. Admixture in litre per m<sup>3</sup> of concrete :
        </label>
        <div className="cement_input">
          <input type="number" className="cement_input_value" step="0.01" {...register("b_12_admixture_liter", { required: true })} />
          <label className="cement_input_label">Liter</label>
        </div>
      </div>

      <div className="grid grid-cols-3 my-4">
        <label className="col-span-3 md:col-span-2 text-lg text-left">
          4. Current cement cost per ton :
        </label>
        <div className="cement_input">
          <input type="number" className="cement_input_value" step="0.01" {...register("c_6_cement_cost", { required: true })} />
          <label className="cement_input_label">USD</label>
        </div>
      </div>

      <div className="grid grid-cols-3 my-4">
        <label className="col-span-3 md:col-span-2 text-lg text-left">
          5. Current Admixture cost per ton :
        </label>
        <div className="cement_input">
          <input type="number" className="cement_input_value" step="0.01" {...register("c_13_admixture_costs", { required: true })}/>
          <label className="cement_input_label">USD</label>
        </div>
      </div>

      <div className="grid grid-cols-3 my-4">
        <label className="col-span-3 md:col-span-2 text-lg text-left">
          6. Current Aggregates cost per m<sup>3</sup> :
        </label>
        <div className="cement_input">
          <input type="number" className="cement_input_value" step="0.01" {...register("c_9_aggregate_costs", { required: true })}/>
          <label className="cement_input_label">USD</label>
        </div>
      </div>

      </form>

      { isSubmitted &&
        <Output data={calRes}/> 
      }

    </div>
  )
}

export default ConcreteInput