import React, { useEffect, useState } from "react";
import ParamEditor from "./components/ParamEditor";
import { Model, Param } from "./types/ParamTypes";
import { fetchData } from "./utilities/asyncRequest";

const API_URL_PARAMS = "http://localhost:3003/params";
const API_URL_MODEL = "http://localhost:3004/model";

const App: React.FC = () => {
	const [dataParams, setDataParams] = useState<Param[] | null>(null);
	const [dataModel, setDataModel] = useState<Model | null>(null);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchDataFromBackend = async () => {
			try {
				const [paramsResult, modelResult] = await Promise.all([
					fetchData<Param[]>(API_URL_PARAMS),
					fetchData<Model>(API_URL_MODEL),
				]);
				setDataParams(paramsResult);
				setDataModel(modelResult);
			} catch (error) {
				setError("Failed to fetch data from the server.");
				console.error(error);
			} finally {
				setLoading(false);
			}
		};

		fetchDataFromBackend();
	}, []);

	const paramEditorComponent = !loading &&
		!error &&
		dataParams &&
		dataModel && <ParamEditor params={dataParams} model={dataModel} />;

	return (
		<>
			<header className="my-7">
				<h1 className="text-2xl text-center mb-3">
					Тестовое задание. Организация - Selsup.
				</h1>
				<h2 className="text-xl text-center">Редактор параметров</h2>
			</header>
			<main className="flex justify-around items-center flex-wrap gap-8">
				{loading ? (
					<div>Загрузка...</div>
				) : error ? (
					<div>{error}</div>
				) : (
					paramEditorComponent
				)}
			</main>
		</>
	);
};

export default App;
