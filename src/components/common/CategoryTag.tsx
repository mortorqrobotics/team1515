import styled from 'styled-components';

interface CategoryTagProps {
  $category: 'workshop' | 'competition' | 'community' | 'other';
}

const CategoryTag = styled.span<CategoryTagProps>`
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.md}`};
  background: ${({ $category, theme }) => {
    switch ($category) {
      case 'workshop':
        return theme.colors.primary;
      case 'competition':
        return theme.colors.accent;
      case 'community':
        return theme.colors.success;
      default:
        return theme.colors.mediumGray;
    }
  }};
  color: white;
  border-radius: 4px;
  font-size: 0.8rem;
  text-transform: uppercase;
`;

export default CategoryTag; 