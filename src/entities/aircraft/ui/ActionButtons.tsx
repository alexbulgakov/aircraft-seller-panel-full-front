import { DeleteIcon, EditIcon } from '@chakra-ui/icons'
import { Box, IconButton } from '@chakra-ui/react'

export function ActionButtons({ onOpenDelete, onOpenEdit }: { onOpenDelete: () => void; onOpenEdit: () => void }) {
  return (
    <Box display="flex" gap={3} flexDirection="row">
      <IconButton onClick={onOpenEdit} aria-label="Edit" icon={<EditIcon />} />
      <IconButton onClick={onOpenDelete} aria-label="Delete" icon={<DeleteIcon />} />
    </Box>
  )
}
