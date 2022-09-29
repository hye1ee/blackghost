export const FLAG = {
	GAUGE: {
		FIRST: {
			START: 0,
			END: 65,
		},
		SECOND: {
			START: 65,
			END: 97,
		},
		THIRD: {
			START: 97,
			END: 100,
		},
		SPEED: 50,
	},
	GAME: {
		MEMORY: {
			SHOW_TIME: 3000,
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
			SHOW_TIME: 5,
			SHAKE_TIME: 300,
		}
	},
	USER: {
		STAGE: 'FIRST',
		GAME: false,
	},
};
