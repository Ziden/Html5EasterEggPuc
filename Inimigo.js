var SrMola = me.ObjectEntity.extend(
    {
        init: function (x, y, settings)
        {
            // define this here instead of tiled
            settings.image = "wheelie_right";
            settings.spritewidth = 64;
            // call the parent constructor
            this.parent(x, y , settings);

            this.startX = x;
            this.endX   = x+settings.width - settings.spritewidth; // size of sprite


            // make him start from the right
            this.pos.x = x + settings.width - settings.spritewidth;
            this.walkLeft = true;

            // walking & jumping speed
            this.setVelocity(2, 4);

            // make it collidable
            this.collidable = true;
            this.type = me.game.ENEMY_OBJECT;

            // bounding box
            this.updateColRect(4,40,8,40);

        },


        onCollision : function (res, obj)
        {

            // res.y >0 means touched by something on the bottom
            // which mean at top position for this one
           // if (this.alive && (res.y > 0) && obj.falling)
           // {
           //     // make it flicker
            //    this.flicker(45);
           // }
        },


        // manage the enemy movement
        update : function ()
        {
            // do nothing if not visible
            if (!this.visible)
                return false;

            if (this.alive)
            {
                if (this.walkLeft && this.pos.x <= this.startX)
                {
                    this.walkLeft = false;
                }
                else if (!this.walkLeft && this.pos.x >= this.endX)
                {
                    this.walkLeft = true;
                }
                this.doWalk(this.walkLeft);
            }
            else
            {
                this.vel.x = 0;
            }

            // check & update movement
            this.updateMovement();

            //update animation if necessary
            if (this.vel.x!=0 ||this.vel.y!=0)
            {
                // update the object animation
                this.parent();
                return true;
            }
            return false;
        }
    });







var Morcego = me.ObjectEntity.extend(
    {
        init: function (x, y, settings)
        {
            // define this here instead of tiled
            settings.image = "morcego";
            settings.spritewidth = 32;

            // call the parent constructor
            this.parent(x, y , settings);


            this.startX = x;
            this.endX   = x+settings.width - settings.spritewidth; // size of sprite


            // make him start from the right
            this.pos.x = x + settings.width - settings.spritewidth;
            this.walkLeft = true;

            // walking & jumping speed
            this.setVelocity(2, 4);

            // make it collidable
            this.collidable = true;
            this.type = me.game.ENEMY_OBJECT;

            this.startY = this.pos.y;

            // bounding box
            this.updateColRect(4,40,8,40);

        },


        onCollision : function (res, obj)
        {

            // res.y >0 means touched by something on the bottom
            // which mean at top position for this one
           // if (this.alive && (res.y > 0) && obj.falling)
           // {
          //      // make it flicker
          //      this.flicker(45);
          //  }
        },


        // manage the enemy movement
        update : function ()
        {

            this.pos.y = this.startY;
            // do nothing if not visible
            if (!this.visible)
                return false;

            if (this.alive)
            {
                if (this.walkLeft && this.pos.x <= this.startX)
                {
                    this.walkLeft = false;
                }
                else if (!this.walkLeft && this.pos.x >= this.endX)
                {
                    this.walkLeft = true;
                }
                this.doWalk(this.walkLeft);
            }
            else
            {
                this.vel.x = 0;
            }

            // check & update movement
            this.updateMovement();

            //update animation if necessary
            if (this.vel.x!=0 ||this.vel.y!=0)
            {
                // update the object animation
                this.parent();
                return true;
            }
            return false;
        }
    });
















var Hadouken = me.ObjectEntity.extend(
    {
        init: function (x, y, settings)
        {
            // define this here instead of tiled
            settings.image = "imghadouken";
            settings.spritewidth = 36;

            // call the parent constructor
            this.parent(x, y , settings);


            this.startX = x;
            this.endX   = x+settings.width - settings.spritewidth; // size of sprite


            // make him start from the right
            this.pos.x = x + settings.width - settings.spritewidth;
            this.walkLeft = true;

            // walking & jumping speed
            this.setVelocity(2, 4);

            // make it collidable
            this.collidable = true;
            this.type = me.game.ENEMY_OBJECT;

            this.startY = this.pos.y;

            // bounding box
            this.updateColRect(0,32,0,25);

        },


        onCollision : function (res, obj)
        {

            // res.y >0 means touched by something on the bottom
            // which mean at top position for this one
            // if (this.alive && (res.y > 0) && obj.falling)
            // {
            //      // make it flicker
            //      this.flicker(45);
            //  }
        },


        // manage the enemy movement
        update : function ()
        {

            this.pos.y = this.startY;

            //  if (!this.visible)
            //    return false;

            if (this.alive)
            {
                if(hadoukenGo==true) {
                    this.pos.x -= 3;
                    if(this.pos.x < 0)
                        me.game.remove(this);
                }
            }
            else
            {
                this.vel.x = 0;
            }

            // check & update movement
            this.updateMovement();

            //update animation if necessary
            if (this.vel.x!=0 ||this.vel.y!=0)
            {
                // update the object animation
                this.parent();
                return true;
            }
            return false;
        }
    });