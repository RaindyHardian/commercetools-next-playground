import { displayAmount } from '@/utils/common';
import { CURRENCY_CODE, LANGUAGE } from '@/utils/constants';
import { Box, Flex, Image, Text } from '@chakra-ui/react';
import { Product } from '@commercetools/platform-sdk';
import React from 'react';

type Props = {
  product: Product;
};

const ProductDetail = ({ product }: Props) => {
  const productName = product?.masterData?.current?.name?.[LANGUAGE.EN_AU];
  const imageUrl = product?.masterData?.current?.masterVariant?.images?.[0].url;
  const currencyCode =
    product?.masterData?.current?.masterVariant?.prices?.[0].value.currencyCode;
  const centAmount =
    product?.masterData?.current?.masterVariant?.prices?.[0].value.centAmount;

  return (
    <Flex gap={'20px'}>
      <Box width={'40%'}>
        <Image
          src={imageUrl}
          alt={productName}
          objectFit={'cover'}
          objectPosition={'center center'}
          width={'100%'}
          height={'100%'}
          borderRadius={'md'}
        />
      </Box>
      <Flex direction={'column'}>
        <Text fontSize="1.25rem" fontWeight="500">
          {productName}
        </Text>
        <Text fontSize="1.5rem" fontWeight="400">
          {displayAmount({
            value: (centAmount ?? 0) / 100,
            currencySymbol: currencyCode
              ? CURRENCY_CODE[currencyCode as keyof typeof CURRENCY_CODE]
              : undefined,
            minimumFractionDigits: 2,
          })}
        </Text>
      </Flex>
    </Flex>
  );
};

export default ProductDetail;
