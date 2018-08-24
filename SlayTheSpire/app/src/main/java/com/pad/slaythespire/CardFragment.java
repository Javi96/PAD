package com.pad.slaythespire;


import android.app.AlertDialog;
import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.support.annotation.Nullable;
import android.support.v4.app.Fragment;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.LinearLayout;
import android.widget.MediaController;
import android.widget.PopupWindow;
import android.widget.Toast;
import android.widget.VideoView;

import java.util.ArrayList;
import java.util.List;


/**
 * A simple {@link Fragment} subclass.
 */
public class CardFragment extends Fragment {


    public CardFragment() {
        // Required empty public constructor
    }

    @Override
    public void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        // Inflate the layout for this fragment

        final ArrayList<String> dataList = new ArrayList<>();
        for (int i=0; i<50; i++){
            dataList.add("Dato:" + i);
        }
        View view = inflater.inflate(R.layout.fragment_card, container, false);
        final RecyclerView recyclerView  = view.findViewById(R.id.recycle_view_classification);
        recyclerView.setLayoutManager(new LinearLayoutManager(this.getActivity(), LinearLayoutManager.VERTICAL, false));


        /*MediaController mediaController = new MediaController(this.getActivity());
        VideoView videoView = view.findViewById(R.id.video);
        String videoPath = "android.resource://com.pad.slaythespire/raw/crop";
        Uri uri = Uri.parse(videoPath);
        videoView.setVideoURI(uri);
        videoView.setMediaController(mediaController);
        mediaController.setAnchorView(videoView);
        videoView.start();*/

        final ClassificationAdapter classificationAdapter = new ClassificationAdapter(dataList);
        classificationAdapter.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Toast.makeText(getContext(), "Selected " +
                        dataList.get(recyclerView.getChildAdapterPosition(v)), Toast.LENGTH_LONG).show();
                //startActivity(new Intent(getActivity(), FriendRequestActivity.class));
                AlertDialog.Builder builder = new AlertDialog.Builder(getActivity());
                View newView = getLayoutInflater().inflate(R.layout.activity_friend_request,null);
                builder.setView(newView);
                AlertDialog alertDialog = builder.create();
                alertDialog.show();
            }
        });

        recyclerView.setAdapter(classificationAdapter);

        return view;
    }

}
