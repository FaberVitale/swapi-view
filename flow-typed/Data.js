/* eslint-disable no-undef*/
declare type ItemData = {|
  +data: Object,
  +meta: Object,
  +links: Object
|};

declare type PageData = {|
  +next: string | null,
  +previous: string | null,
  +items: Array<string>
|};
