export const FLAG = {
	GAUGE: {
		FIRST: {
			START: 0,
			END: 30,
		},
		SECOND: {
			START: 30,
			END: 70,
		},
		THIRD: {
			START: 70,
			END: 100,
		},
		SPEED: 20,
	},
	GAME: {
		MEMORY: {
			SHOW_TIME: 800,
			QUIZ_TIME: 2000,
			FADE_TIME: 500,
			WRONG_TIME: 600,
			BOARD: {
				ANSWER: {
					ROW: 4,
					COL: 4,
					SIZE: 60,
				},
				QUIZ: {
					ROW: 1,
					COL: 6,
					SIZE: 85,
				}
			}
		},
		DOS: {
			SHOW_TIME: 3,
			SHAKE_TIME: 300,
		}
	},
	USER: {
		STAGE: 'FIRST',
		GAME: false,
	},
};
