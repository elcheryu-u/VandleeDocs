import * as React from 'react';
import Rating from '@u_ui/u-ui/Rating';
import Stack from '@u_ui/u-ui/Stack';

export default function HalfRating() {
  return (
    <Stack spacing={1}>
      <Rating name="half-rating" defaultValue={2.5} precision={0.5} />
      <Rating name="half-rating-read" defaultValue={2.5} precision={0.5} readOnly />
    </Stack>
  );
}
