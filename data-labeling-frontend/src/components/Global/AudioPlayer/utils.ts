import { Region } from "../../../slices/Labeling/audioSlice";

export enum SortOrder {
	CREATED_ASC = "CREATED_ASC",
	CREATED_DESC = "CREATED_DESC",
	START_ASC = "START_ASC",
	START_DESC = "START_DESC",
}

export const sortRegions = (regions: Region[], sortOrder: SortOrder) => {
	return regions.sort((a, b) => {
		switch (sortOrder) {
			case SortOrder.CREATED_ASC:
				return a.createdAt - b.createdAt;
			case SortOrder.CREATED_DESC:
				return b.createdAt - a.createdAt;
			case SortOrder.START_ASC:
				return a.start - b.start;
			case SortOrder.START_DESC:
				return b.start - a.start;
			default:
				return 0;
		}
	});
};
