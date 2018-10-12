import { Config } from "@stencil/core";
import { sass } from "@stencil/sass";

export const config: Config = {
	namespace: "bab-expand",
	outputTargets: [
		{
			type: "dist"
		},
		{
			type: "www",
			serviceWorker: null
		}
	],
	plugins: [sass()]
};
