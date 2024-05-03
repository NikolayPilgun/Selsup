import React, { useState } from "react";
import { Model, Props } from "../types/ParamTypes";

const ParamEditor: React.FC<Props> = ({ params, model }) => {
	const [editedParams, setEditedParams] = useState<Map<number, string>>(
		new Map()
	);

	const updateParamValue = (paramId: number, value: string) => {
		setEditedParams((prevEditedParams) => {
			const updatedParams = new Map(prevEditedParams);
			updatedParams.set(paramId, value);
			return updatedParams;
		});
	};

	const getModel = (): Model => {
		const updatedParamValues = model.paramValues.map((paramValue) => ({
			...paramValue,
			value: editedParams.get(paramValue.paramId) ?? paramValue.value,
		}));
		return { paramValues: updatedParamValues };
	};

	return (
		<article className="flex flex-col gap-5 justify-center items-center">
			{params.map((param) => (
				<div className="w-[350px]" key={param.id}>
					<label className="block text-gray-700 font-bold mb-2">
						{param.name}
					</label>
					<input
						className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-md"
						type="text"
						value={
							editedParams.get(param.id) ??
							(model.paramValues.find((pv) => pv.paramId === param.id)?.value ||
								"")
						}
						onChange={(e) => updateParamValue(param.id, e.target.value)}
					/>
				</div>
			))}

			<button
				onClick={() => console.log(getModel())}
				className="w-[150px] bg-purple-600 hover:bg-purple-800 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
			>
				getModel
			</button>
		</article>
	);
};

export default ParamEditor;
