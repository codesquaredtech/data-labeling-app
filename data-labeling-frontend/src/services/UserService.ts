import LabelingAxiosClient from "../config/api/axios";

export const UserService = {
	getAll,
};

async function getAll() {
	return await LabelingAxiosClient.get("http://localhost:3030/user/all");
}
