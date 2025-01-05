export const LighthouseThresholds = {
	// Setting minimum passing points for each type of test
	Performance: {
		performance: 85
	},
	Accessibility: {
		accessibility: 90
	},
	BestPractices: {
		"best-practices": 85
	},
	SEO: {
		seo: 90
	},
	PWA: {
		pwa: 50
	}
};

export const LighthouseFlagsMobile = {
	// Flags to test the mobile
	formFactor: "mobile",
	screenEmulation: {
		width: 390,
		height: 844,
		disabled: false
	}
};

export const LighthouseFlagsDesktop = {
	// Flags to test the desktop
	formFactor: "desktop",
	screenEmulation: {
		disabled: true
	}
};

export const LighthouseFlagsDesktopSlow = {
	// Flags to test the desktop
	formFactor: "desktop",
	screenEmulation: {
		disabled: true
	},
	throttling: {
		rttMs: 100,
		throughputKbps: 1024,
		cpuSlowdownMultiplier: 1
	}
};

export const LighthouseOptions = {
	settings: { output: "html" },
	extends: "lighthouse:default"
};

export const PageLoad = {
	Time: 1500
};

export const Tags = Object.freeze({
	Smoke: "Smoke",
	PreDeployment: "PreDeployment",
	Performance: "Performance",
	Accessibility: "Accessibility"
});
