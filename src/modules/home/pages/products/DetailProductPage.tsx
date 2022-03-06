import React from 'react';
import { useParams } from 'react-router';

const DetailProductPage = () => {
  const params: any = useParams();

  return <div>DetailProductPage {params['id']}</div>;
};

export default DetailProductPage;
