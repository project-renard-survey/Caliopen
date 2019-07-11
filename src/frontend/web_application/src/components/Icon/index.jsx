import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import './style.scss';

export const typeAssoc = {
  at: 'fa fa-at',
  'address-book': 'fa fa-address-book',
  'angle-down': 'fa fa-angle-down',
  'arrow-right': 'fa fa-arrow-right',
  'arrow-left': 'fa fa-arrow-left',
  bell: 'fa fa-bell',
  'birthday-cake': 'fa fa-birthday-cake',
  briefcase: 'fa fa-briefcase',
  building: 'fa fa-building',
  calendar: 'fa fa-calendar',
  'caret-up': 'fa fa-caret-up',
  'caret-down': 'fa fa-caret-down',
  check: 'fa fa-check',
  circle: 'fa fa-circle',
  cog: 'fa fa-cog',
  comment: 'fa fa-comment',
  comments: 'fa fa-comments',
  'comments-o': 'fa fa-comments-o',
  crosshairs: 'fa fa-crosshairs',
  download: 'fa fa-download',
  'dot-circle': 'fa fa-dot-circle',
  edit: 'fa fa-edit',
  envelope: 'fa fa-envelope',
  'envelope-open': 'fa fa-envelope-open',
  'ellipsis-v': 'fa fa-ellipsis-v',
  email: 'fa fa-envelope',
  editor: 'fa fa-font',
  exchange: 'fa fa-exchange',
  'exclamation-triangle': 'fa fa-exclamation-triangle',
  'expire-soon': 'fa fa-clock-o',
  desktop: 'fa fa-desktop',
  facebook: 'fa fa-facebook',
  file: 'fa fa-file',
  filter: 'fa fa-filter',
  folder: 'fa fa-folder-open',
  github: 'fa fa-github',
  google: 'fa fa-google',
  home: 'fa fa-home',
  'info-circle': 'fa fa-info-circle',
  key: 'fa fa-key',
  laptop: 'fa fa-laptop',
  'list-ul': 'fa fa-list-ul',
  lock: 'fa fa-lock',
  'map-marker': 'fa fa-map-marker',
  mastodon: 'svg svg-mastodon',
  'paper-plane': 'fa fa-paper-plane',
  paperclip: 'fa fa-paperclip',
  pencil: 'fa fa-pencil',
  plug: 'fa fa-plug',
  plus: 'fa fa-plus',
  phone: 'fa fa-phone',
  question: 'fa fa-question',
  'question-circle': 'fa fa-question-circle',
  remove: 'fa fa-remove',
  reply: 'fa fa-reply',
  save: 'fa fa-floppy-o',
  send: 'fa fa-paper-plane',
  search: 'fa fa-search',
  server: 'fa fa-server',
  share: 'fa fa-share',
  'share-alt': 'fa fa-share-alt',
  shield: 'fa fa-shield',
  smartphone: 'fa fa-mobile',
  tag: 'fa fa-tag',
  times: 'fa fa-times',
  upload: 'fa fa-upload',
  user: 'fa fa-user',
  users: 'fa fa-users',
  tablet: 'fa fa-tablet',
  tags: 'fa fa-tags',
  twitter: 'fa fa-twitter',
  'th-large': 'fa fa-th-large',
  trash: 'fa fa-trash',
  warning: 'fa fa-warning',
  'window-maximize': 'fa fa-window-maximize',
};

const svgGlyphs = {
  mastodon: (
    <svg xmlns="http://www.w3.org/2000/svg" width="61.076954mm" height="65.47831mm" viewBox="0 0 216.4144 232.00976">
      <path d="M107.86523 0C78.203984.2425 49.672422 3.4535937 33.044922 11.089844c0 0-32.97656262 14.752031-32.97656262 65.082031 0 11.525-.224375 25.306175.140625 39.919925 1.19750002 49.22 9.02375002 97.72843 54.53124962 109.77343 20.9825 5.55375 38.99711 6.71547 53.505856 5.91797 26.31125-1.45875 41.08203-9.38867 41.08203-9.38867l-.86914-19.08984s-18.80171 5.92758-39.91796 5.20508c-20.921254-.7175-43.006879-2.25516-46.390629-27.94141-.3125-2.25625-.46875-4.66938-.46875-7.20313 0 0 20.536953 5.0204 46.564449 6.21289 15.915.73001 30.8393-.93343 45.99805-2.74218 29.07-3.47125 54.38125-21.3818 57.5625-37.74805 5.0125-25.78125 4.59961-62.916015 4.59961-62.916015 0-50.33-32.97461-65.082031-32.97461-65.082031C166.80539 3.4535938 138.255.2425 108.59375 0h-.72852zM74.296875 39.326172c12.355 0 21.710234 4.749297 27.896485 14.248047l6.01367 10.080078 6.01563-10.080078c6.185-9.49875 15.54023-14.248047 27.89648-14.248047 10.6775 0 19.28156 3.753672 25.85156 11.076172 6.36875 7.3225 9.53907 17.218828 9.53907 29.673828v60.941408h-24.14454V81.869141c0-12.46875-5.24453-18.798829-15.73828-18.798829-11.6025 0-17.41797 7.508516-17.41797 22.353516v32.375002H96.207031V85.423828c0-14.845-5.815468-22.353515-17.417969-22.353516-10.49375 0-15.740234 6.330079-15.740234 18.798829v59.148439H38.904297V80.076172c0-12.455 3.171016-22.351328 9.541015-29.673828 6.568751-7.3225 15.172813-11.076172 25.851563-11.076172z" />
    </svg>
  ),
};

const renderSvg = (type, iconProps) => {
  const markup = svgGlyphs[type];

  return (<span {...iconProps}>{markup}</span>);
};

const Icon = ({
  className, type, spaced, rightSpaced, ...props
}) => {
  // eslint-disable-next-line no-console
  const typeClassName = typeAssoc[type] || console.error(`The type "${type}" is not a valid Icon component type`);
  const isSVG = typeClassName.startsWith('svg');
  const iconProps = {
    ...props,
    className: classnames(
      className,
      typeClassName,
      {
        'm-icon--spaced': spaced,
        'm-icon--right-spaced': rightSpaced,
        'm-icon--svg': isSVG,
      }
    ),
  };

  return isSVG ?
    renderSvg(type, iconProps)
    : (<i {...iconProps} />);
};

Icon.propTypes = {
  className: PropTypes.string,
  type: PropTypes.string,
  spaced: PropTypes.bool,
  rightSpaced: PropTypes.bool,
};
Icon.defaultProps = {
  className: undefined,
  type: undefined,
  spaced: false,
  rightSpaced: false,
};

export default Icon;
