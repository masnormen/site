/**
 * The Humanized version will be appended to the string `${humanized} here in Jakarta.`
 */
export const WMO_CODE_MAP = [
  {
    code: ['0'],
    description: 'Clear sky',
    humanized: 'The sky is clear',
  },
  {
    code: ['1', '2', '3'],
    description: 'Mainly clear, partly cloudy, and overcast',
    humanized: 'It is a bit cloudy',
  },
  {
    code: ['45', '48'],
    description: 'Fog and depositing rime fog',
    humanized: 'It is foggy',
  },
  {
    code: ['51', '53', '55'],
    description: 'Drizzle: Light, moderate, and dense intensity',
    humanized: 'It is drizzling',
  },
  {
    code: ['56', '57'],
    description: 'Freezing Drizzle: Light and dense intensity',
    humanized: 'It is freezing drizzle',
  },
  {
    code: ['61', '63', '65'],
    description: 'Rain: Slight, moderate and heavy intensity',
    humanized: 'It is raining',
  },
  {
    code: ['66', '67'],
    description: 'Freezing Rain: Light and heavy intensity',
    humanized: 'It is freezing rain',
  },
  {
    code: ['71', '73', '75'],
    description: 'Snow fall: Slight, moderate, and heavy intensity',
    humanized: 'It is snowing',
  },
  {
    code: ['77'],
    description: 'Snow grains',
    humanized: 'It is snowing',
  },
  {
    code: ['80', '81', '82'],
    description: 'Rain showers: Slight, moderate, and violent',
    humanized: 'It seems there are rain showers',
  },
  {
    code: ['85', '86'],
    description: 'Snow showers slight and heavy',
    humanized: 'It seems there are snow showers',
  },
  {
    code: ['95'],
    description: 'Thunderstorm: Slight or moderate',
    humanized: 'A thunderstorm is occurring',
  },
  {
    code: ['96', '99'],
    description: 'Thunderstorm with slight and heavy hail',
    humanized: 'Watch out for hail',
  },
] as const;
