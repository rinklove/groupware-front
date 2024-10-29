import React, { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import ExampleCarouselImage from '../../images/FluidExample'; // 실제 이미지 경로로 대체
import styled from 'styled-components';

const StyledCarousel = styled(Carousel)`
	width: 100%;
	height: 40vh; /* Carousel 전체 높이 조정 */

	.carousel-item {
		height: 100%; /* 아이템의 높이를 부모 요소에 맞게 설정 */
		background-color: #0f1317; /* 배경색 설정 */
	}

	img {
		width: 100%; /* 이미지의 너비를 100%로 */
		height: 40vh; /* 이미지의 높이를 100%로 */
		object-fit: contain;
	}

	& span {
		color: #fff;
	}

	& .carousel-control-next-icon,
	& .carousel-control-prev-icon {
		filter: invert(1);
	}
`;

const HomeCarousel = () => {
	const [index, setIndex] = useState(0);

	const handleSelect = (selectedIndex) => {
		setIndex(selectedIndex);
	};

	return (
		<StyledCarousel 
			activeIndex={index} 
			onSelect={handleSelect} data-bs-theme="dark"
			controls={false}
		>
			<Carousel.Item>
				<ExampleCarouselImage 
					src="https://grepp-cloudfront.s3.ap-northeast-2.amazonaws.com/programmers_imgs/publish/202409/09/be-main-banner-pc(1480x800).png"
			/> 
			</Carousel.Item>
			<Carousel.Item>
			<ExampleCarouselImage 
				src="https://grepp-cloudfront.s3.ap-northeast-2.amazonaws.com/programmers_imgs/publish/202409/09/fe-main-banner-pc(1480x800).png"
			/>
			</Carousel.Item>
			<Carousel.Item>
				<ExampleCarouselImage 
					src='https://grepp-cloudfront.s3.ap-northeast-2.amazonaws.com/programmers_imgs/publish/202409/02/240902-main_banner-pc(1480x800).png'
				/>
			</Carousel.Item>
			<Carousel.Item>
				<ExampleCarouselImage 
					src='https://grepp-cloudfront.s3.ap-northeast-2.amazonaws.com/programmers_imgs/publish/202409/02/da-main_banner-pc(1480x800).png'
				/>
			</Carousel.Item>
				<Carousel.Item>
					<ExampleCarouselImage 
						src='https://grepp-cloudfront.s3.ap-northeast-2.amazonaws.com/programmers_imgs/publish/202409/09/de-main-banner-pc(1480x800).png'
					/>
				</Carousel.Item>
		</StyledCarousel>
	);
};

export default HomeCarousel;
