"use client";

import { getAttributes } from "@tiptap/core";
import Link from "@tiptap/extension-link";
import { Plugin, PluginKey } from "@tiptap/pm/state";

export const ControlClickLink = Link.extend({
  addOptions() {
    return {
      ...this.parent?.(),
      openOnClick: false,
    };
  },
  addProseMirrorPlugins() {
    const plugins: Plugin[] = this.parent?.() ?? [];

    const ctrlClickHandler = new Plugin({
      key: new PluginKey("handleControlClick"),
      props: {
        handleClick(view, pos, event) {
          const attrs = getAttributes(view.state, "link");
          const link = (event.target as HTMLElement)?.closest("a");

          const keyPressed = event.ctrlKey || event.metaKey;

          if (keyPressed && link && attrs.href) {
            // eslint-disable-next-line
            window.open(attrs.href, attrs.target);

            return true;
          }

          return false;
        },
      },
    });

    plugins.push(ctrlClickHandler);

    return plugins;
  },
});
