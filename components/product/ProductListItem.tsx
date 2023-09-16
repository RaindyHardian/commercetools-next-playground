import { displayAmount } from '@/utils/common';
import { CURRENCY_CODE, LANGUAGE } from '@/utils/constants';
import { Flex, Link, Image, Text } from '@chakra-ui/react';
import { Product } from '@commercetools/platform-sdk';
import NextLink from 'next/link';
import React from 'react';

type Props = {
  product: Product;
};

const ProductListItem = ({ product }: Props) => {
  const productName = product?.masterData?.current?.name?.[LANGUAGE.EN_AU];
  const imageUrl = product?.masterData?.current?.masterVariant?.images?.[0].url;
  const currencyCode =
    product?.masterData?.current?.masterVariant?.prices?.[0].value.currencyCode;
  const centAmount =
    product?.masterData?.current?.masterVariant?.prices?.[0].value.centAmount;
  const detailPageUrl = `/products/${product.id}`;

  return (
    <Flex
      flex={'1 1 200px'}
      maxWidth={'200px'}
      flexDir={'column'}
      boxShadow={'rgba(0, 0, 0, 0.12) 0px 1px 6px 0px'}
      borderRadius={'md'}
    >
      <Flex>
        <Link as={NextLink} href={detailPageUrl}>
          <Image
            src={imageUrl}
            alt={productName}
            objectFit={'cover'}
            objectPosition={'center center'}
            width={'100%'}
            height={'100%'}
            borderTopRadius={'md'}
          />
        </Link>
      </Flex>
      <Flex padding="8px">
        <Link
          as={NextLink}
          href={detailPageUrl}
          _hover={{}}
          display={'flex'}
          flexDir={'column'}
          width="100%"
          textAlign={'left'}
        >
          <Text
            fontSize="0.9rem"
            textColor={'black'}
            maxWidth={'100%'}
            maxHeight={'100%'}
            whiteSpace={'pre-wrap'}
            wordBreak={'keep-all'}
            textOverflow={'ellipsis'}
            overflow={'hidden'}
            display={'-webkit-box'}
            style={{ WebkitLineClamp: '3', WebkitBoxOrient: 'vertical' }}
          >
            {productName}
          </Text>
          <Text fontWeight={'bold'}>
            {displayAmount({
              value: (centAmount ?? 0) / 100,
              currencySymbol: currencyCode
                ? CURRENCY_CODE[currencyCode as keyof typeof CURRENCY_CODE]
                : undefined,
              minimumFractionDigits: 2,
            })}
          </Text>
        </Link>
      </Flex>
    </Flex>
  );
};

export default ProductListItem;
