import React, { useState } from "react";

interface Param {
	id: number;
	name: string;
	type: "string";
}

interface ParamValue {
	paramId: number;
	value: string;
}

interface Model {
	paramValues: ParamValue[];
}

interface Props {
	params: Param[];
	model: Model;
}

const ParamEditorFC: React.FC<Props> = ({ params, model }) => {
	const [editedValues, setEditedValues] = useState<{ [key: number]: string }>(
		() => {
			const values: { [key: number]: string } = {};
			params.forEach((param) => {
				const paramValue = model.paramValues.find(
					(pv) => pv.paramId === param.id
				);
				values[param.id] = paramValue ? paramValue.value : "";
			});
			return values;
		}
	);

	const handleInputChange = (paramId: number, value: string) => {
		setEditedValues((prevValues) => ({
			...prevValues,
			[paramId]: value,
		}));
	};

	const getModel = (): void => {
		const paramValues: ParamValue[] = Object.keys(editedValues).map(
			(paramId) => ({
				paramId: parseInt(paramId),
				value: editedValues[parseInt(paramId)],
			})
		);
		console.log({ paramValues });
	};

	return (
		<article className="flex flex-col gap-5 justify-center items-center">
			{params.map((param) => (
				<div className="w-[350px] " key={param.id}>
					<label className="block text-gray-700 font-bold mb-2">
						{param.name}
					</label>
					<input
						className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-md"
						type="text"
						value={editedValues[param.id]}
						onChange={(e) => handleInputChange(param.id, e.target.value)}
					/>
				</div>
			))}

			<button
				className="w-[150px] bg-purple-600 hover:bg-purple-800 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
				onClick={() => getModel()}
			>
				getModel
			</button>
		</article>
	);
};

const dataItems: Props = {
	params: [
		{ id: 1, name: "Назначение", type: "string" },
		{
			id: 2,
			name: "Длина",
			type: "string",
		},
	],
	model: {
		paramValues: [
			{ paramId: 1, value: "повседневное" },
			{ paramId: 2, value: "макси" },
		],
	},
};

const App: React.FC = () => {
	return (
		<>
			<header className="my-7">
				<h1 className="text-2xl text-center mb-3">
					Тестовое задание. Организация - Selsup.
				</h1>
				<h2 className="text-xl text-center">Редактор параметров</h2>
			</header>
			<main className="flex justify-around items-center flex-wrap gap-8">
				<ParamEditorFC params={dataItems.params} model={dataItems.model} />
				<ParamEditorFC params={dataItems.params} model={dataItems.model} />
				<ParamEditorFC params={dataItems.params} model={dataItems.model} />
				<ParamEditorFC params={dataItems.params} model={dataItems.model} />
				<ParamEditorFC params={dataItems.params} model={dataItems.model} />
				<ParamEditorFC params={dataItems.params} model={dataItems.model} />
			</main>
		</>
	);
};

export default App;
