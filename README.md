# pallium-rsync

This plugin uses the node-rsync module to run rsync commands based on Pallium events. Use it to make a copy of your content. You can also listen for build events from a static site generator plugin and then publish your site to a remote directory.

## Usage

In order to use this plugin, you must include a `rsync.js` file in your configuration directory. This file should export an object with one property: *listeners*, which is an array of the events and settings for rsync execution. Each listener object should include at least an *event* property that defines the Pallium hook. It should also include source and destination directories. See the [`Rsync.build`](https://github.com/mattijs/node-rsync#build) for other available options.


## Example

```javascript
module.exports = {
    listeners: [
        {
            event: 'app/models/entry-factory/saved',
            source: process.cwd() + '/content',
            destination: process.cwd() + '/content-copy',
            exclude: ['.git', '*.lock'],
            flags: 'az',
            delete: true,
            shell: 'ssh'
        }
    ]
};
```
