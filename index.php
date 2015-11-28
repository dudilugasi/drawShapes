<!DOCTYPE html>
<!--
To change this license header, choose License Headers in Project Properties.
To change this template file, choose Tools | Templates
and open the template in the editor.
-->
<html>
    <head>
        <title>computers graphics</title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link href="style.css" rel="stylesheet" type="text/css">
        <script src="//code.jquery.com/jquery-1.11.3.min.js"></script>
        <script src="lib/numeric-1.2.6.min.js"></script>
        <script src="lib/drawer.js"></script>
        <script src="lib/ui.js"></script>
    </head>
    <body>
        <header>
            <div class="wrap">
                <div id="user-interface">

                    <div class="ui-item">
                        <input type="radio" name="shape" value="line" class="ui-item-radio" id="ui-line" checked>
                        <label class="ui-item-label ui-item-label-radio" for="ui-line">
                            <div class="ui-item-label-radio-icon"></div>

                        </label>
                    </div>
                    <div class="ui-item">
                        <input type="radio" name="shape" value="circle" class="ui-item-radio" id="ui-circle">
                        <label class="ui-item-label ui-item-label-radio" for="ui-circle">
                            <div class="ui-item-label-radio-icon"></div>
                        </label>
                    </div>
                    <div class="ui-item">
                        <input type="radio" name="shape" value="curve" class="ui-item-radio" id="ui-curve">
                        <label class="ui-item-label ui-item-label-radio" for="ui-curve">
                            <div class="ui-item-label-radio-icon"></div>
                        </label>
                    </div>

                    <div class="ui-item">
                        <input type="radio" name="shape" value="polygon" class="ui-item-radio" id="ui-polygon">
                        <label class="ui-item-label ui-item-label-radio" for="ui-polygon">
                            <div class="ui-item-label-radio-icon"></div>
                        </label>
                    </div>

                    <div class="ui-item ui-item-text-container hidden">
                        <label>accuracy</label>
                        <input type="number" name="accuracy" min="2" value="200" max="9999" id="accuracy" />
                    </div>

                    <div class="ui-item ui-item-text-container hidden">
                        <label>sides</label>
                        <input type="number" name="lines" min="3" max="100" value="3" id="lines" />
                    </div>


                    <div class="ui-item">
                        <button id="clear">clear</button>
                    </div>
                    <div class="clear"></div>
                </div>
            </div>
        </header>

        <div class="wrap">
            <div class="xAxis-container">
                <?php for ($i = 50; $i <= 500; $i += 50): ?>
                    <span class="xAxis"><?php echo $i ?></span>
                <?php endfor; ?>        
            </div>
            <div class="yAxis-container">
                <?php for ($i = 0; $i <= 500; $i += 50): ?>
                    <span class="yAxis"><?php echo $i ?></span>
                <?php endfor; ?>            
            </div>
            <canvas id="myCanvas" width="500" height="500" style="border:1px solid #000000;">
            </canvas>
        </div>
    </body>
</html>
