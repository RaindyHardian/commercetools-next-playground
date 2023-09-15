import { Flex, Text } from '@chakra-ui/react';
import { ProductPagedQueryResponse } from '@commercetools/platform-sdk';
import React from 'react';
import ProductListItem from './ProductListItem';

type Props = {
  data: ProductPagedQueryResponse;
};

const ProductList = ({ data }: Props) => {
  return (
    <Flex direction={'column'}>
      <Text fontSize={'3xl'} fontWeight={'bold'}>
        Products
      </Text>
      <Flex flexWrap={'wrap'} rowGap={'30px'} columnGap={'20px'} pb={'20px'}>
        {data.results.map((product) => (
          <ProductListItem key={product.id} product={product} />
        ))}
      </Flex>
    </Flex>
  );
};

export default ProductList;
