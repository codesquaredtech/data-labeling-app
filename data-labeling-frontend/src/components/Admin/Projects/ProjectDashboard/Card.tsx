import React from "react";

type CardProps = {
	type: string;
	title: string;
	subtitle: string;
	icon?: string;
	onRemove?: () => void;
	onEdit?: () => void;
};

export default function Card({ type, title, subtitle, icon, onRemove, onEdit }: CardProps) {
	const determineIcon = () => {
		switch (subtitle) {
			case "text":
				return (
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="36"
						height="36"
						fill="currentColor"
						className="bi bi-fonts"
						viewBox="0 0 16 16"
					>
						<path d="M12.258 3h-8.51l-.083 2.46h.479c.26-1.544.758-1.783 2.693-1.845l.424-.013v7.827c0 .663-.144.82-1.3.923v.52h4.082v-.52c-1.162-.103-1.306-.26-1.306-.923V3.602l.431.013c1.934.062 2.434.301 2.693 1.846h.479L12.258 3z" />
					</svg>
				);
			case "boolean":
				return (
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="36"
						height="36"
						fill="currentColor"
						className="bi bi-question-circle"
						viewBox="0 0 16 16"
					>
						<path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
						<path d="M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286zm1.557 5.763c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94z" />
					</svg>
				);
			case "number":
				return (
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="36"
						height="36"
						fill="currentColor"
						className="bi bi-123"
						viewBox="0 0 16 16"
					>
						<path d="M2.873 11.297V4.142H1.699L0 5.379v1.137l1.64-1.18h.06v5.961h1.174Zm3.213-5.09v-.063c0-.618.44-1.169 1.196-1.169.676 0 1.174.44 1.174 1.106 0 .624-.42 1.101-.807 1.526L4.99 10.553v.744h4.78v-.99H6.643v-.069L8.41 8.252c.65-.724 1.237-1.332 1.237-2.27C9.646 4.849 8.723 4 7.308 4c-1.573 0-2.36 1.064-2.36 2.15v.057h1.138Zm6.559 1.883h.786c.823 0 1.374.481 1.379 1.179.01.707-.55 1.216-1.421 1.21-.77-.005-1.326-.419-1.379-.953h-1.095c.042 1.053.938 1.918 2.464 1.918 1.478 0 2.642-.839 2.62-2.144-.02-1.143-.922-1.651-1.551-1.714v-.063c.535-.09 1.347-.66 1.326-1.678-.026-1.053-.933-1.855-2.359-1.845-1.5.005-2.317.88-2.348 1.898h1.116c.032-.498.498-.944 1.206-.944.703 0 1.206.435 1.206 1.07.005.64-.504 1.106-1.2 1.106h-.75v.96Z" />
					</svg>
				);

			default:
				return (
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="36"
						height="36"
						fill="currentColor"
						className="bi bi-fonts"
						viewBox="0 0 16 16"
					>
						<path d="M12.258 3h-8.51l-.083 2.46h.479c.26-1.544.758-1.783 2.693-1.845l.424-.013v7.827c0 .663-.144.82-1.3.923v.52h4.082v-.52c-1.162-.103-1.306-.26-1.306-.923V3.602l.431.013c1.934.062 2.434.301 2.693 1.846h.479L12.258 3z" />
					</svg>
				);
		}
	};

	switch (type) {
		case "user":
			return (
				<div className="card bg-base-100 shadow-xl mb-2">
					<div className="card-body p-3">
						<div className="flex w-full h-16 gap-3">
							<div className="flex align-items-center justify-start flex-0 shrink-0">
								<div className="avatar">
									<div className="w-10 rounded-full">
										<img src={icon} alt="avatar" />
									</div>
								</div>
							</div>
							<div className="flex flex-col justify-center flex-1 min-w-0">
								<h2 className="text-l font-bold truncate">{title}</h2>
								<div className="text-m text-accent-focus truncate w-full">{subtitle}</div>
							</div>
							<div className="flex flex-col justify-start align-items-end flex-0 shrink-0">
								<button onClick={onRemove} className="btn btn-xs btn-circle btn-error btn-outline">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="16"
										height="16"
										fill="currentColor"
										className="bi bi-x"
										viewBox="0 0 16 16"
									>
										<path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
									</svg>
								</button>
							</div>
						</div>
					</div>
				</div>
			);
		case "metadata":
			return (
				<div className="card bg-base-100 shadow-xl mb-2">
					<div className="card-body p-3">
						<div className="flex w-full h-16 gap-3">
							<div className="flex align-items-center justify-start flex-0 shrink-0">{determineIcon()}</div>
							<div className="flex flex-col flex-1 min-w-0 justify-center">
								<h2 className="text-l font-bold truncate w-full">{title}</h2>
								<div className="text-m text-accent-focus">{subtitle}</div>
							</div>
							<div className="flex flex-col align-items-end justify-between flex-0 shrink-0">
								<div className="flex align-items-start">
									<button onClick={onRemove} className="btn btn-xs btn-circle btn-error btn-outline">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="16"
											height="16"
											fill="currentColor"
											className="bi bi-x"
											viewBox="0 0 16 16"
										>
											<path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
										</svg>
									</button>
								</div>
								<div className="flex align-items-end">
									<button onClick={onEdit} className="btn btn-xs btn-circle btn-warning btn-outline">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="10"
											height="10"
											fill="currentColor"
											className="bi bi-pencil"
											viewBox="0 0 16 16"
										>
											<path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
										</svg>
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			);
		case "resource":
			return (
				<div className="card bg-base-100 shadow-xl mb-2">
					<div className="card-body p-3">
						<div className="flex w-full h-16 gap-3">
							<div className="flex align-items-center justify-start flex-0 shrink-0">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="36"
									height="36"
									fill="currentColor"
									className="bi bi-chat-left-text"
									viewBox="0 0 16 16"
								>
									<path d="M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H4.414A2 2 0 0 0 3 11.586l-2 2V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12.793a.5.5 0 0 0 .854.353l2.853-2.853A1 1 0 0 1 4.414 12H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
									<path d="M3 3.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zM3 6a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 3 6zm0 2.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5z" />
								</svg>
							</div>
							<div className="flex flex-col flex-1 min-w-0 justify-center">
								<h2 className="text-l font-bold truncate w-full">{title}</h2>
								<div className="text-m text-accent-focus truncate w-full">{subtitle}</div>
							</div>
							<div className="flex flex-col align-items-end justify-between flex-0 shrink-0">
								<div className="flex align-items-start">
									<button onClick={onRemove} className="btn btn-xs btn-circle btn-error btn-outline">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="16"
											height="16"
											fill="currentColor"
											className="bi bi-x"
											viewBox="0 0 16 16"
										>
											<path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
										</svg>
									</button>
								</div>
								<div className="flex align-items-end">
									<button onClick={onEdit} className="btn btn-xs btn-circle btn-warning btn-outline">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="10"
											height="10"
											fill="currentColor"
											className="bi bi-pencil"
											viewBox="0 0 16 16"
										>
											<path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
										</svg>
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			);
		default:
			return <h2>No Card</h2>;
	}
}
