import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import { defaultArticleState, TAppliedStyles } from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	const [appliedStyles, setAppliedStyles] = useState<TAppliedStyles>({
		fontFamily: defaultArticleState.fontFamilyOption,
		fontSize: defaultArticleState.fontSizeOption,
		fontColor: defaultArticleState.fontColor,
		containerWidth: defaultArticleState.contentWidth,
		bgColor: defaultArticleState.backgroundColor,
	});

	return (
		<main
			className={clsx(styles.main)}
			style={
				{
					'--font-family': appliedStyles.fontFamily.value,
					'--font-size': appliedStyles.fontSize.value,
					'--font-color': appliedStyles.fontColor.value,
					'--container-width': appliedStyles.containerWidth.value,
					'--bg-color': appliedStyles.bgColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm
				appliedStyles={appliedStyles}
				setAppliedStyles={setAppliedStyles}
			/>
			<Article />
		</main>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
