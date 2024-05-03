import React, { useEffect, useState } from "react";
import ParamEditor from "./components/ParamEditor";
import { Model, Param } from "./types/ParamTypes";
import { fetchData } from "./utilities/asyncRequest";

const App: React.FC = () => {
	const [dataParams, setDataParams] = useState<Param[] | null>(null);
	const [dataModel, setDataModel] = useState<Model | null>(null);

	useEffect(() => {
		const fetchDataFromBackend = async () => {
			try {
				const result = await fetchData<Param[]>("http://localhost:3003/params");
				setDataParams(result);
			} catch (error) {
				console.error(error);
			}
		};

		fetchDataFromBackend();
	}, []);

	useEffect(() => {
		const fetchDataFromBackend = async () => {
			try {
				const result = await fetchData<Model>("http://localhost:3004/model");
				setDataModel(result);
			} catch (error) {
				console.error(error);
			}
		};

		fetchDataFromBackend();
	}, []);

	return (
		<>
			<header className="my-7">
				<h1 className="text-2xl text-center mb-3">
					Тестовое задание. Организация - Selsup.
				</h1>
				<h2 className="text-xl text-center">Редактор параметров</h2>
			</header>
			<main className="flex justify-around items-center flex-wrap gap-8">
				{dataParams != null && dataModel != null ? (
					<ParamEditor params={dataParams} model={dataModel} />
				) : (
					<div>Загрузка...</div>
				)}
			</main>
		</>
	);
};

export default App;
