/**
 * Main axis alignment options for Row and Column components.
 * Controls how children are positioned along the main axis.
 */
export type MainAxisAlignment =
  'start' |    // Similar to Flutter's MainAxisAlignment.start
  'center' |   // Similar to Flutter's MainAxisAlignment.center
  'end' |      // Similar to Flutter's MainAxisAlignment.end
  'between' |  // Similar to Flutter's MainAxisAlignment.spaceBetween
  'around' |   // Similar to Flutter's MainAxisAlignment.spaceAround
  'evenly';    // Similar to Flutter's MainAxisAlignment.spaceEvenly

/**
 * Cross axis alignment options for Row and Column components.
 * Controls how children are positioned along the cross axis.
 */
export type CrossAxisAlignment =
  'start' |    // Similar to Flutter's CrossAxisAlignment.start
  'center' |   // Similar to Flutter's CrossAxisAlignment.center
  'end' |      // Similar to Flutter's CrossAxisAlignment.end
  'stretch';   // Similar to Flutter's CrossAxisAlignment.stretch


/**
 * Defines the allowed spacing values for the margin and padding components.
 * Values are in pixels and follow a consistent scale.
 */
export type SpacingValue = 0 | 4 | 8 | 16 | 24 | 32;

/**
 * Alignment options for the Stack component.
 * Controls how children are positioned within the stack.
 */
export type Alignment =
  'top-start' |
  'top-center' |
  'top-end' |
  'center-start' |
  'center' |
  'center-end' |
  'bottom-start' |
  'bottom-center' |
  'bottom-end';
