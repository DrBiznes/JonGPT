import { responseManager } from './responseManager';
import musicCategory from './categories/priority-2/musicResponses';
import youtubeCategory from './categories/priority-1/youtubeResponses';
import imageCategory from './categories/priority-1/imageResponses';
import gameCategory from './categories/priority-2/gameResponses';
import identityCategory from './categories/priority-3/identityResponses';
import generalCategory from './categories/priority-4/generalResponses';

export function initializeResponses() {
  // Register categories in priority order
  responseManager.registerCategory(musicCategory);
  responseManager.registerCategory(youtubeCategory);
  responseManager.registerCategory(imageCategory);
  responseManager.registerCategory(gameCategory);
  responseManager.registerCategory(identityCategory);
  responseManager.registerCategory(generalCategory);
} 