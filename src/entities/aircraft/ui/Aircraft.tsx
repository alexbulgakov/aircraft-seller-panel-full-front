import { Box, Td, Tr } from '@chakra-ui/react'

import { formatToUSDCurrency } from '@/shared/lib'

export function Aircraft({
  name,
  price,
  children,
  count,
}: {
  name: React.ReactNode
  price: number
  children: React.ReactNode
  count: number
}) {
  return (
    <Tr>
      <Td>
        <Box display="flex" justifyContent="space-between" alignItems="center" gap={3} flexDirection="row">
          {name}
          <Box p={1} minW="25px" border="1px" borderColor="gray.300" rounded="xl" textAlign="center">
            {count}
          </Box>
        </Box>
      </Td>
      <Td>{price ? formatToUSDCurrency(Number(price)) : '-'}</Td>
      <Td>{children}</Td>
    </Tr>
  )
}
