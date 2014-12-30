var herb = require("./herb");

herb.marker({ background: 'bgBlack' }).left("left aligned test");

herb.group("Lorem Ipsum").right("This is a right test").center("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc nec tellus ante. In iaculis faucibus sapien sed semper. Nunc porta mattis lacus, quis lacinia nibh aliquam sit amet. Integer eu volutpat urna, aliquet elementum odio. Sed suscipit odio lectus, vitae rhoncus tortor consequat in. Integer ultrices ultricies mi. Mauris dictum dolor non eros eleifend auctor. Etiam venenatis mauris ut velit cursus, vel venenatis ante rutrum. Phasellus et massa elit. Curabitur interdum, libero in semper suscipit, turpis felis condimentum velit, vitae finibus mauris mauris in", "one more");

herb.groupEnd();