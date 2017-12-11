import { toM3u8 } from '../src/toM3u8';
import QUnit from 'qunit';

QUnit.module('toM3u8');

QUnit.test('playlists', function(assert) {
  const input = [{
    attributes: {
      id: '1',
      codecs: 'foo;bar',
      sourceDuration: 100,
      bandwidth: '20000',
      periodIndex: 1,
      mimeType: 'audio/mp4'
    },
    segments: []
  }, {
    attributes: {
      id: '2',
      codecs: 'foo;bar',
      sourceDuration: 100,
      bandwidth: '10000',
      periodIndex: 1,
      mimeType: 'audio/mp4'
    },
    segments: []
  }, {
    attributes: {
      sourceDuration: 100,
      id: '1',
      width: '800',
      height: '600',
      codecs: 'foo;bar',
      bandwidth: '10000',
      periodIndex: 1,
      mimeType: 'video/mp4'
    },
    segments: []
  }, {
    attributes: {
      sourceDuration: 100,
      id: '1',
      bandwidth: '20000',
      periodIndex: 1,
      mimeType: 'text/vtt',
      url: 'https://www.example.com/vtt'
    },
    segments: []
  }, {
    attributes: {
      sourceDuration: 100,
      id: '1',
      bandwidth: '10000',
      periodIndex: 1,
      mimeType: 'text/vtt',
      url: 'https://www.example.com/vtt'
    },
    segments: []
  }];

  const expected = {
    allowCache: true,
    discontinuityStarts: [],
    duration: 100,
    endList: true,
    mediaGroups: {
      AUDIO: {
        audio: {
          main: {
            autoselect: true,
            default: true,
            language: '',
            playlists: [{
              attributes: {
                BANDWIDTH: 20000,
                CODECS: 'foo;bar',
                NAME: '1',
                ['PROGRAM-ID']: 1
              },
              endList: true,
              resolvedUri: '',
              segments: [],
              timeline: 1,
              uri: ''
            }],
            uri: ''
          }
        }
      },
      ['CLOSED-CAPTIONS']: {},
      SUBTITLES: {},
      SUBTITLES: {
        subs: {
          text: {
            autoselect: false,
            default: false,
            language: 'text',
            playlists: [{
              attributes: {
                BANDWIDTH: 20000,
                NAME: '1',
                ['PROGRAM-ID']: 1
              },
              endList: true,
              resolvedUri: 'https://www.example.com/vtt',
              segments: [],
              timeline: 1,
              uri: ''
            }],
            uri: ''
          }
        }
      },
      VIDEO: {}
    },
    playlists: [{
      attributes: {
        AUDIO: 'audio',
        SUBTITLES: 'subs',
        BANDWIDTH: 10000,
        CODECS: 'foo;bar',
        NAME: '1',
        ['PROGRAM-ID']: 1,
        RESOLUTION: {
          height: 600,
          width: 800
        }
      },
      endList: true,
      resolvedUri: '',
      segments: [],
      timeline: 1,
      uri: ''
    }],
    segments: [],
    uri: ''
  };

  assert.deepEqual(toM3u8(input), expected);
});

QUnit.test('no playlists', function(assert) {
  assert.deepEqual(toM3u8([]), {});
});
