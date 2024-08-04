import { floor, random, some, findIndex } from 'lodash';

import { avatarColors } from './static.data';

export class UtilsService {

    static avatarColor() {
        return avatarColors[floor(random(0.9) * avatarColors.length)];
    }


    static generateAvatar(text: string, backgroundColor: string, foregroundColor: string = 'white'): string {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');

        if (context) {
            canvas.width = 200;
            canvas.height = 200;

            context.fillStyle = backgroundColor;
            context.fillRect(0, 0, canvas.width, canvas.height);

            // Draw text
            context.font = 'normal 80px sans-serif';
            context.fillStyle = foregroundColor;
            context.textAlign = 'center';
            context.textBaseline = 'middle';
            context.fillText(text, canvas.width / 2, canvas.height / 2);
        }

        return canvas.toDataURL('image/png');
    }
}
