import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';

import styles from './ArticleParamsForm.module.scss';
import clsx from 'clsx';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { useEffect, useState } from 'react';
import {
	defaultArticleState,
	OptionType,
	TArticleParamsFormProps,
	TFormState,
	fontFamilyOptions,
	fontSizeOptions,
	fontColors,
	contentWidthArr,
	backgroundColors,
} from 'src/constants/articleProps';

import { Separator } from 'src/ui/separator';

export const ArticleParamsForm = ({
	appliedStyles,
	setAppliedStyles,
}: TArticleParamsFormProps) => {
	const [form, setForm] = useState<TFormState>({
		isOpen: false,
		fontFamily: appliedStyles.fontFamily,
		fontSize: appliedStyles.fontSize,
		fontColor: appliedStyles.fontColor,
		containerWidth: appliedStyles.containerWidth,
		bgColor: appliedStyles.bgColor,
	});

	useEffect(() => {
		if (form.isOpen) {
			document.body.classList.add(styles.lockScroll);
		} else {
			document.body.classList.remove(styles.lockScroll);
		}

		return () => {
			document.body.classList.remove(styles.lockScroll);
		};
	}, [form.isOpen]);

	const toggleOpen = () => {
		setForm((prev: TFormState) => ({
			...prev,
			isOpen: !prev.isOpen,
		}));
	};
	const handleOptionChange = (
		param: keyof TFormState,
		selected: OptionType
	) => {
		setForm((prev) => ({
			...prev,
			[param]: selected,
		}));
	};

	const handleReset = () => {
		setForm({
			isOpen: form.isOpen,
			fontFamily: defaultArticleState.fontFamilyOption,
			fontSize: defaultArticleState.fontSizeOption,
			fontColor: defaultArticleState.fontColor,
			containerWidth: defaultArticleState.contentWidth,
			bgColor: defaultArticleState.backgroundColor,
		});
		setAppliedStyles({
			fontFamily: defaultArticleState.fontFamilyOption,
			fontSize: defaultArticleState.fontSizeOption,
			fontColor: defaultArticleState.fontColor,
			containerWidth: defaultArticleState.contentWidth,
			bgColor: defaultArticleState.backgroundColor,
		});
	};

	const handleAppliesStyles = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setAppliedStyles({
			fontFamily: form.fontFamily,
			fontSize: form.fontSize,
			fontColor: form.fontColor,
			containerWidth: form.containerWidth,
			bgColor: form.bgColor,
		});
		toggleOpen();
	};
	return (
		<>
			<ArrowButton isOpen={form.isOpen} onClick={toggleOpen} />
			<div
				className={clsx(styles.overlay, form.isOpen && styles.overlayVisible)}
				onClick={toggleOpen}
			/>
			<aside
				className={clsx(
					styles.container,
					form.isOpen && styles.container_open
				)}>
				<form
					className={styles.form}
					onReset={handleReset}
					onSubmit={handleAppliesStyles}>
					<h2 className={styles.title}>Задайте параметры</h2>
					<Select
						selected={form.fontFamily}
						options={fontFamilyOptions}
						title='Шрифт'
						onChange={(selected) => handleOptionChange('fontFamily', selected)}
					/>
					<RadioGroup
						name={'FontSize'}
						options={fontSizeOptions}
						selected={form.fontSize}
						title={'Размер шрифта'}
						onChange={(selected) => handleOptionChange('fontSize', selected)}
					/>
					<Select
						selected={form.fontColor}
						options={fontColors}
						title='Цвет шрифта'
						onChange={(selected) => handleOptionChange('fontColor', selected)}
					/>
					<Separator />
					<Select
						selected={form.bgColor}
						options={backgroundColors}
						title='Цвет фона'
						onChange={(selected) => handleOptionChange('bgColor', selected)}
					/>
					<Select
						selected={form.containerWidth}
						options={contentWidthArr}
						title='Ширина контента'
						onChange={(selected) =>
							handleOptionChange('containerWidth', selected)
						}
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
