import {Difficulty} from "../../../models/difficulty.model";
import {DifficultyDto} from "../models/difficulty-dto.model";

export function mapDifficultyDtoToDifficulty(difficultyDto: DifficultyDto): Difficulty {
  switch (difficultyDto) {
    case 'easy':
      return Difficulty.EASY;
    case 'medium':
      return Difficulty.MEDIUM;
    case 'hard':
      return Difficulty.HARD;
    default:
      throw new Error(`Unknown difficulty: ${difficultyDto}`);
  }
}

export function mapDifficultyToDifficultyDto(difficulty: Difficulty): DifficultyDto {
  switch (difficulty) {
    case Difficulty.EASY:
      return 'easy';
    case Difficulty.MEDIUM:
      return 'medium';
    case Difficulty.HARD:
      return 'hard';
  }
}
